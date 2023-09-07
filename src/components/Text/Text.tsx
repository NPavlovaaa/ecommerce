import * as React from 'react';

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({
   className,
   view = "inherit",
   tag: Tag = "p",
   weight,
   children,
   color = "inherit",
   maxLines
}) => {

    let localColor: string;
    const button: string = "18";
    const title: string = "32"; // bold lineHeight 48
    const p20: string = "20"; // lineHeight 24
    const p16: string = "16"; // lineHeight 20
    const p18: string = "18"; // lineHeight 22
    const p14: string = "14"; // lineHeight 18
    let lineHeight: string = "inherit";

    function countLineHeight(fontSize: number) {
        return (fontSize + 4).toString()
    }

    switch (color) {
        case "secondary":
            localColor = "#AFADB5";
            break
        case "accent":
            localColor = "#518581";
            break
        case "primary":
            localColor = "#000000"
    }

    switch (view) {
        case "button":
            view = button
            lineHeight = button
            break
        case "title": {}
            view = title
            if (!weight) {
                weight = "bold"
                lineHeight = countLineHeight(+title)
            }
            break
        case "p-20":
            view = p20
            lineHeight = countLineHeight(+p20)
            break
        case "p-18":
            view = p18
            lineHeight = countLineHeight(+p18)
            break
        case "p-16":
            view = p16
            lineHeight = countLineHeight(+p16)
            break
        case "p-14":
            view = p14
            lineHeight = countLineHeight(+p14)
            break
    }

    return (
        React.createElement(Tag, { className, style: {
                color: localColor,
                fontWeight: weight,
                fontSize: `${view}px`,
                lineHeight: `${lineHeight}px`,
                overflow: maxLines ? "hidden" : null,
                textOverflow: maxLines ? "ellipsis" : null,
                display: maxLines ? "-webkit-box" : null,
                webkitLineClamp: maxLines ? maxLines.toString() : null,
                webkitBoxOrient: maxLines ? "vertical" : null
            } }, children)
    );
};


export default Text;
