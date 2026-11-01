import io
from typing import Dict, Any
from pypdf import PdfReader

class DocumentExtractor:
    def extract(self, file_content: bytes, filename: str) -> Dict[str, Any]:
        file_type = filename.lower().split('.')[-1]
        
        if file_type == 'txt':
            try:
                text = file_content.decode('utf-8')
                if not text.strip():
                    return {
                        "extracted_text": "",
                        "extraction_status": "warning",
                        "extraction_message": "File is empty"
                    }
                return {
                    "extracted_text": text,
                    "extraction_status": "success",
                    "extraction_message": "Text extracted successfully"
                }
            except Exception as e:
                return {
                    "extracted_text": "",
                    "extraction_status": "error",
                    "extraction_message": f"Error decoding text file: {str(e)}"
                }
        
        elif file_type == 'pdf':
            try:
                pdf_file = io.BytesIO(file_content)
                reader = PdfReader(pdf_file)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
                
                if not text.strip():
                    return {
                        "extracted_text": "",
                        "extraction_status": "warning",
                        "extraction_message": "PDF has no extractable text. No OCR support implemented."
                    }
                return {
                    "extracted_text": text,
                    "extraction_status": "success",
                    "extraction_message": "Text extracted from PDF successfully"
                }
            except Exception as e:
                return {
                    "extracted_text": "",
                    "extraction_status": "error",
                    "extraction_message": f"Error extracting PDF: {str(e)}"
                }
        else:
            return {
                "extracted_text": "",
                "extraction_status": "error",
                "extraction_message": "Unsupported file type. Only PDF and TXT are accepted."
            }
