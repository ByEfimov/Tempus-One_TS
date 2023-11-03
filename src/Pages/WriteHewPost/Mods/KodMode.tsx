/* eslint-disable react-hooks/exhaustive-deps */
import CustomInput from '../../../Components/minicops/input';
import { ModsOfInput } from '../../../Utils/ModsOfComps';
import { FC, useEffect, useState } from 'react';
import Styles from '../Styles.module.css';
import FeatherIcon from 'feather-icons-react';
import { PostData } from '../WritePost';
import { UpdateData } from '../../../Utils/UpdatePostData';
import classNames from 'classnames';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import ShowModal, { ModsForShowModal } from '../Modals/ShowModal';

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
    const [UserCode, setUserCode] = useState(AllDataOfPost[SelectMode.id].text);
    const [isModalClueCodeOpen, setIsModalClueCodeOpen] = useState(false);
    const [isModalErrorsOpen, setIsModalErrorsOpen] = useState(false);
    useEffect(() => {
        UpdateData(
            setAllDataForPost,
            SelectMode,
            AllDataOfPost,
            'text',
            undefined,
            UserCode
        );
    }, [UserCode]);
    useEffect(() => {
        setUserCode(AllDataOfPost[SelectMode.id].text);
    }, [SelectMode]);

    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        UpdateData(setAllDataForPost, SelectMode, AllDataOfPost, 'title', e);
    }
    function reverceBlock() {
        document.getElementById('card')?.classList.toggle(Styles.cardActive);
    }

    return (
        <>
            {isModalClueCodeOpen && (
                <ShowModal
                    mode={ModsForShowModal.ClueCode}
                    setIsModalOpen={setIsModalClueCodeOpen}
                ></ShowModal>
            )}
            {isModalErrorsOpen && (
                <ShowModal
                    mode={ModsForShowModal.Errors}
                    setIsModalOpen={setIsModalErrorsOpen}
                    userText={AllDataOfPost[SelectMode.id].text}
                ></ShowModal>
            )}

            <LiveProvider enableTypeScript={true} code={UserCode}>
                <div className={Styles.topBlock} id="topBlock">
                    <CustomInput
                        mode={ModsOfInput.small}
                        value={AllDataOfPost[SelectMode.id].title || ''}
                        placeholder="Название для кода"
                        changeFunction={changeTitle}
                    ></CustomInput>
                    <div className={Styles.buttons}>
                        <button
                            onClick={() => {
                                setIsModalErrorsOpen(true);
                            }}
                            className={Styles.alertButton}
                        >
                            <FeatherIcon
                                icon="alert-triangle"
                                className={Styles.Img}
                            />
                        </button>
                        <button
                            onClick={() => {
                                setIsModalClueCodeOpen(true);
                            }}
                            className={Styles.helpButton}
                        >
                            <FeatherIcon
                                icon="help-circle"
                                className={Styles.Img}
                            />
                        </button>
                        <button
                            onClick={reverceBlock}
                            className={Styles.swapButton}
                        >
                            <FeatherIcon
                                icon="refresh-ccw"
                                className={Styles.Img}
                            />
                        </button>
                    </div>
                </div>

                <div className={Styles.card} id="card">
                    <div className={classNames(Styles.face, Styles.front)}>
                        <div>
                            <LiveEditor
                                className={Styles.LiveEdit}
                                onChange={(e) => setUserCode(e)}
                            />
                        </div>
                    </div>
                    <div className={classNames(Styles.face, Styles.back)}>
                        <h1>
                            {(
                                <div>
                                    <LivePreview />
                                </div>
                            ) || 'Здесь будет результат.'}
                        </h1>
                    </div>
                </div>
            </LiveProvider>
        </>
    );
};

export default KodMode;
