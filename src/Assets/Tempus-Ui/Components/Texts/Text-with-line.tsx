import Styles from './Texts.module.scss';

interface TextWithLine {
    children: React.ReactChild | React.ReactNode;
}

const TextWithLine = ({ children }: TextWithLine) => {
    return <div className={Styles.TextWithLine}>{children}</div>;
};

export default TextWithLine;
