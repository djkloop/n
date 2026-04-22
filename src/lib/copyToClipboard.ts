type ClipboardPolicyDocument = Document & {
 permissionsPolicy?: { allowsFeature?: (feature: string) => boolean };
};

function fallbackCopyText(text: string) {
 const textArea = document.createElement("textarea");
 textArea.value = text;
 textArea.setAttribute("readonly", "true");
 textArea.style.position = "fixed";
 textArea.style.top = "-9999px";
 textArea.style.left = "-9999px";
 document.body.appendChild(textArea);
 textArea.focus();
 textArea.select();

 try {
 return document.execCommand("copy");
 } finally {
 document.body.removeChild(textArea);
 }
}

function canUseClipboardApi() {
 if (!navigator.clipboard?.writeText) {
 return false;
 }

 const permissionsPolicy = (document as ClipboardPolicyDocument).permissionsPolicy;

 if (permissionsPolicy?.allowsFeature) {
 return permissionsPolicy.allowsFeature("clipboard-write");
 }

 return true;
}

export async function copyToClipboard(text: string) {
 if (canUseClipboardApi()) {
 await navigator.clipboard.writeText(text);
 return true;
 }

 return fallbackCopyText(text);
}
