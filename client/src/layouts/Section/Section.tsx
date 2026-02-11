import "./Section.scss"

import classNames from "classnames"
import "./Section.scss"
import Button from "@/components/Button"
import Icon from "@/components/Icon"

interface BaseProps {
    className: string,
    children: React.ReactNode,
    title: string,
    description: string,
    hasSlider?: boolean,
    dataJsSection?: string,
}

type SectionProps = BaseProps & ({
    hasButton: false,
} | {
    hasButton: true,
    ButtonText: string,
})

const Section = (props:SectionProps) => {

    const {
        className,
        children,
        hasButton,
        title,
        description,
        hasSlider = true,
        dataJsSection
    } = props

    const ButtonText = 'ButtonText' in props ? (props as any).ButtonText : '';

    return (
        <section className={classNames("section container", className)} data-js-section={dataJsSection} >
            <img className="section-stars" src="/src/assets/icons/stars.svg" />
            <h2 className={`${className}-title `}>{title}</h2>
            <div className={`${className}__events section-events`}>
                <p className={`${className}-description description section-description`}>{description}</p>
                {hasButton && (
                    <Button title={ButtonText} label={ButtonText} className={`${className}-button hidden-mobile button--section`} />
                )}
            </div>
            <div className="section-main">
                {children}
            </div>
            {hasSlider && (
                <div className={`${className}-slider__actions section-slider__actions`} >
                    {hasButton && (
                        <Button title={ButtonText} label={ButtonText} className={`${className}-button visible-mobile button--section`} />
                    )}
                    <div className={`${className}-slider__actions-pagination section-slider__actions-pagination`}></div>
                    <div className={`${className}-slider__actions-navigation section-slider__actions-navigation hidden-mobile`}>
                        <div className={`${className}-slider__actions-navigation-prev section-slider__actions-navigation-prev`}>
                            <Icon name="arrow-right"/>
                        </div>
                        <div className={`${className}-slider__actions-navigation-next section-slider__actions-navigation-next`}>
                            <Icon name="arrow-right"/>
                        </div>
                    </div>
                    <div className={`${className}-slider__actions-navigation-prev section-slider__actions-navigation-prev visible-mobile`}>
                            <Icon name="arrow-right"/>
                    </div>
                    <div className={`${className}-slider__actions-navigation-next section-slider__actions-navigation-next visible-mobile`}>
                            <Icon name="arrow-right"/>
                    </div>
                </div>
            )}

        </section>
    )
}



export default Section