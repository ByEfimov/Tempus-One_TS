export function reversBlock(title: string, Styles: string) {
    document.getElementById(title)?.classList.toggle(Styles);
}
