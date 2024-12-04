import React from 'react';

type BackgroundComponentProps = {
    children: React.ReactNode
    className?: string
}

type BackgroundWrapperProps = {
    backgrounds?: React.FC<BackgroundComponentProps>[]
    children: React.ReactNode
}

const BackgroundWrapper = ({ backgrounds = [], children }: BackgroundWrapperProps) => {
    return backgrounds.reduceRight((acc, Background, index) => {
        // each element is rendered wrapping the previous
        return (
            <Background key={index} className="h-full">
                {acc}
            </Background>
        );
    }, children);
};

export default BackgroundWrapper;