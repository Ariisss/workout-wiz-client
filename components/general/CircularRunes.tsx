"use client"
import ReactCurvedText from 'react-curved-text';

export type CircularRunesProp = {
    parentHeight: number,
    fontSize: number,
    letterSpacing: number,
    glow: 'off' | 'mild' | 'intense'
}

export default function CircularRunes({ parentHeight, letterSpacing, glow }: CircularRunesProp) {
    // scaling factor based on figma
    const scaleFactor = 1.4;
    const maxFont = 128
    const minFont = 100

    const actualFont = minFont + (maxFont - minFont) * 100*(parentHeight - 640)/(75*256) 
    const targetSize = parentHeight * scaleFactor;
    const fill = {
        off: 'var(--primary-dark)',
        mild: 'var(--primary)',
        intense: 'var(--primary-light)'
    }

    return (
        <div className="absolute absolute-center">
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