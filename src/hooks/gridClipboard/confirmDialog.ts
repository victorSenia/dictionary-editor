export async function confirmDialog(message: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(15, 23, 42, 0.45)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    const dialog = document.createElement("div");
    dialog.style.width = "min(520px, calc(100vw - 24px))";
    dialog.style.background = "#ffffff";
    dialog.style.border = "1px solid #cbd5e1";
    dialog.style.borderRadius = "8px";
    dialog.style.boxShadow = "0 20px 40px rgba(15, 23, 42, 0.25)";
    dialog.style.padding = "16px";
    dialog.style.fontFamily = "Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
    dialog.style.color = "#111827";

    const text = document.createElement("p");
    text.textContent = message;
    text.style.margin = "0 0 14px";
    text.style.fontSize = "14px";
    text.style.lineHeight = "1.45";

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.justifyContent = "flex-end";
    actions.style.gap = "8px";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.style.border = "1px solid #cbd5e1";
    cancelButton.style.borderRadius = "6px";
    cancelButton.style.background = "#ffffff";
    cancelButton.style.color = "#111827";
    cancelButton.style.padding = "7px 12px";
    cancelButton.style.cursor = "pointer";

    const okButton = document.createElement("button");
    okButton.type = "button";
    okButton.textContent = "OK";
    okButton.style.border = "1px solid #86efac";
    okButton.style.borderRadius = "6px";
    okButton.style.background = "#f0fdf4";
    okButton.style.color = "#166534";
    okButton.style.padding = "7px 12px";
    okButton.style.cursor = "pointer";

    const cleanup = () => {
      window.removeEventListener("keydown", onKeyDown, true);
      overlay.remove();
    };

    const finish = (result: boolean) => {
      cleanup();
      resolve(result);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish(false);
      } else if (event.key === "Enter") {
        event.preventDefault();
        finish(true);
      }
    };

    cancelButton.addEventListener("click", () => finish(false));
    okButton.addEventListener("click", () => finish(true));
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        finish(false);
      }
    });

    actions.append(cancelButton, okButton);
    dialog.append(text, actions);
    overlay.append(dialog);
    document.body.append(overlay);

    window.addEventListener("keydown", onKeyDown, true);
    okButton.focus();
  });
}
