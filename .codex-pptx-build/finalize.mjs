import path from 'node:path';
import { pathToFileURL } from 'node:url';
const SKILL_DIR='C:/Users/singh/.codex/plugins/cache/openai-primary-runtime/presentations/26.1026.10807/skills/presentations';
const workspaceDir='C:/Users/singh/OneDrive/Desktop/Al Prompt Injection Defense Tester IBM PROJECT';
const candidatePath=path.join(workspaceDir,'.codex-pptx-build','draft.pptx');
const finalPath=path.join(workspaceDir,'deliverables','PromptGuard_Project_Overview_Canva.pptx');
const {finalizePresentation}=await import(pathToFileURL(path.join(SKILL_DIR,'container_tools/artifact_tool_utils.mjs')).href);
const result=await finalizePresentation({
  explicitTotalSlideCount:6,
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable:'C:/Users/singh/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',
  integrityValidatorPath:path.join(SKILL_DIR,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(SKILL_DIR,'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],
  requiredNativeTableOwnerSlides:[],
  requiredNativeChartOwnerSlides:[],
  fontPolicy:{basis:'design',families:['Arial']},
  verifyArtifactToolImport:true,
  receiptPath:path.join(workspaceDir,'.codex-pptx-build','PromptGuard_Project_Overview.validation.json'),
});
console.log(JSON.stringify(result,null,2));
