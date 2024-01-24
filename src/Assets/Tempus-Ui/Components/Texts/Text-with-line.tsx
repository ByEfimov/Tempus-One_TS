import Styles from './Texts.module.scss';

interface TextWithLine {
    children: React.ReactChild | React.ReactNode;
}

const TextWithLine = ({ children }: TextWithLine) => {
    return (
        <div className={Styles.TextWithLine}>
            <div className={Styles.line1}></div>

            <div className={Styles.text}> {children}</div>
            <div className={Styles.line2}></div>
        </div>
    );
};

export default TextWithLine;
