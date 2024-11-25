"use client"
import ReactCurvedText from 'react-curved-text';

export type CircularRunesProp = {
    parentHeight: number,
    fontSize: number,
    letterSpacing: number,
    glow: 'off' | 'mild' | 'intense'
}

export default function CircularRunes({ parentHeight, fontSize, letterSpacing, glow }: CircularRunesProp) {
    // scaling factor based on figma
    const scaleFactor = 1.4;
    const targetSize = parentHeight * scaleFactor;
    const fill = {
        off: 'var(--primary-dark)',
        mild: 'var(--primary)',
        intense: 'var(--primary-light)'
    }

    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <ReactCurvedText
                width={targetSize}
                height={targetSize}
                cx={targetSize / 2}           // Centered horizontally
                cy={targetSize / 2}           // Centered vertically
                rx={targetSize / 3}           // Adjusted radius x
                ry={targetSize / 3}           // Adjusted radius y
                startOffset={0}              // Offset to control text placement
                reversed={true}
                text="ᚠᚢᚦᚩᚱᚳᚷᚹᛥᚻᚾᛁᛄᛇᛈᛉᛋᚻᛏᛒᛖᛗᛚᛝᛞᛟᛢᚪᚫᚣᛡᛠᛣᚩᚱᚳᚷ"
                textProps={{
                    style: {
                        letterSpacing: letterSpacing,
                        fill: fill[glow],
                        fontSize: fontSize,
                    }
                }}
            />
        </div>
    );
}