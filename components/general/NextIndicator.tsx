type NextIndicatorProps = {
    size: number
    className?: string
}

export default function NextIndicator({
    size,
    className
}: NextIndicatorProps) {
    const width = size*1.04
    return (
        <svg
            width={width}
            height={size}
            viewBox={`0 0 ${width} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g filter="url(#filter0_d_205_139)" transform={`scale(${size / 200})`}>
                <path
                    d="M67.7898 107.378L20.5 194.5L202.5 107.378L20.5 20.5L67.7898 107.378Z"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_205_139"
                    x={0.5}
                    y={0.5}
                    width={222}
                    height={214}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation={10} />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_205_139"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_205_139"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    )
}