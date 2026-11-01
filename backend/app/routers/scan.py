from fastapi import APIRouter, HTTPException, UploadFile, File
from app.modules.models import ScanRequest, ScanResponse
from app.modules.scanner import Scanner
from app.modules.document_extractor import DocumentExtractor

router = APIRouter()
scanner = Scanner()
extractor = DocumentExtractor()

MAX_FILE_SIZE = 4 * 1024 * 1024  # Keep room for multipart overhead under Vercel's 4.5 MB request limit.

@router.post("/scan-text", response_model=ScanResponse)
async def scan_text(request: ScanRequest):
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    if len(request.text) > 50000:
        raise HTTPException(status_code=400, detail="Text exceeds maximum length of 50000 characters")
    
    result = scanner.scan(request.text)
    return result

@router.post("/scan-file")
async def scan_file(file: UploadFile = File(...)):
    # Check file type
    if not file.filename.lower().endswith(('.pdf', '.txt')):
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are accepted")
    
    # Read file
    content = await file.read()
    
    # Check file size
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File exceeds maximum size of 4MB")
    
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="File is empty")
    
    # Extract text
    extraction = extractor.extract(content, file.filename)
    
    # Scan extracted text
    if extraction["extracted_text"]:
        scan_result = scanner.scan(extraction["extracted_text"])
    else:
        scan_result = {
            "verdict": "Safe",
            "categories": [],
            "findings": [],
            "message": "No text extracted to scan",
            "can_send_to_chatbot": False
        }
    
    return {
        "filename": file.filename,
        "file_type": file.filename.lower().split('.')[-1],
        "extracted_text": extraction["extracted_text"],
        "extraction_status": extraction["extraction_status"],
        "extraction_message": extraction["extraction_message"],
        "scan_result": scan_result,
        "warnings": [extraction["extraction_message"]] if extraction["extraction_status"] != "success" else []
    }
