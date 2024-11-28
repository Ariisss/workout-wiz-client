"use client"
import { cn } from '@/lib/utils';
import ReactCurvedText from 'react-curved-text';

export type CircularRunesProp = {
    parentHeight: number,
    fontSize: number,
    letterSpacing: number,
    glow: 'off' | 'mild' | 'intense',
    className?: string
}

export default function CircularRunes({
    parentHeight,
    letterSpacing,
    glow,
    className
}: CircularRunesProp) {
    // scaling factor based on figma
    const scaleFactor = 1.4;
    const fontRatio = 1 / 0.75
    const maxFont = 128
    const minFont = 100
    const minHeight = 640
    const maxHeight = 896

    const actualFont = minFont + (maxFont - minFont) * fontRatio * (parentHeight - minHeight) / (maxHeight - minHeight)
    const targetSize = parentHeight * scaleFactor;
    const fill = {
        off: 'var(--primary-dark)',
        mild: 'var(--primary)',
        intense: 'var(--primary-light)'
    }

    return (
        <div className={cn("absolute absolute-center", className)}>
            <ReactCurvedText
                width={targetSize}
                height={targetSize}
                cx={targetSize / 2}           // Centered horizontally
                cy={targetSize / 2}           // Centered vertically
                rx={targetSize / 3}           // Adjusted radius x
                ry={targetSize / 3}           // Adjusted radius y
                startOffset={0}              // Offset to control text placement
                reversed={true}
                text="ᛈᛉᛋᚻᛏᛒᛖᚠᚢᚦᚩᚱᚳᚷᚹᛥᚻᚾᛁᛄᛇᛈᛉᛋᚻᛏᛒᛖᛗᛚᛝᛞᛟᛢᚪᚫᚣᛡᛠᛣᚩᚱᚳᚷ"
                textProps={{
                    style: {
                        letterSpacing: letterSpacing,
                        fill: fill[glow],
                        fontSize: actualFont,
                    }
                }}
            />
        </div>
    );
}