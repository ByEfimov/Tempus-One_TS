import CustomTextarea from '../../../Components/minicops/textarea';
import CustomInput from '../../../Components/minicops/input';
import { ModsOfInput } from '../../../Utils/ModsOfComps';
import { FC } from 'react';
import Styles from '../Styles.module.css';
import FeatherIcon from 'feather-icons-react';
import { PostData } from '../WritePost';
import { UpdateData } from '../../../Utils/UpdatePostData';
import classNames from 'classnames';

interface ModsProps {
    AllDataOfPost: Array<{
        id: number;
        type: string;
        text: string;
        title?: string;
    }>;
    SelectMode: { type: string; id: number };
    setAllDataForPost: React.Dispatch<React.SetStateAction<PostData>>;
}

const KodMode: FC<ModsProps> = ({
    AllDataOfPost,
    SelectMode,
    setAllDataForPost,
}) => {
    function changeKod(e: React.ChangeEvent<HTMLTextAreaElement>) {
        UpdateData(setAllDataForPost, e, SelectMode, AllDataOfPost, 'text');
    }
    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        UpdateData(setAllDataForPost, e, SelectMode, AllDataOfPost, 'title');
    }
    function reverceBlock() {
        document.getElementById('card')?.classList.toggle(Styles.cardActive);
    }

    return (
        <>
            <div className={Styles.topBlock} id="topBlock">
                <CustomInput
                    mode={ModsOfInput.small}
                    value={AllDataOfPost[SelectMode.id].title || ''}
                    placeholder="Название для кода"
                    changeFunction={changeTitle}
                ></CustomInput>
                <button onClick={reverceBlock} className={Styles.swapButton}>
                    <FeatherIcon icon="refresh-ccw" className={Styles.Img} />
                </button>
            </div>

            <div className={Styles.card} id="card">
                <div className={classNames(Styles.face, Styles.front)}>
                    <CustomTextarea
                        value={AllDataOfPost[SelectMode.id].text}
                        placeholder="Введите сюда свой код"
                        changeFunction={changeKod}
                    ></CustomTextarea>
                </div>
                <div className={classNames(Styles.face, Styles.back)}>
                    <h1>
                        {AllDataOfPost[SelectMode.id].text ||
                            'Здесь будет результат.'}
                    </h1>
                </div>
            </div>
        </>
    );
};

export default KodMode;
