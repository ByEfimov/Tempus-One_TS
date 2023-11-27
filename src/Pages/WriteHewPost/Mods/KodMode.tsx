/* eslint-disable react-hooks/exhaustive-deps */
import CustomInput from '../../../Components/minicops/input';
import { ModsOfInput } from '../../../Utils/ModsOfComps';
import { FC, useEffect, useState } from 'react';
import Styles from '../Styles.module.scss';
import { PostData } from '../WritePost';
import { UpdateData } from '../../../Utils/UpdatePostData';
import classNames from 'classnames';
import { LiveProvider, LiveEditor } from 'react-live';
import ShowModal, { ModsForShowModal } from '../Modals/ShowModal';
import ActiveButton from '../../../Components/ShowPosts/postsComp/activeButton';
import ShowCode from '../../../Components/ShowPosts/postsComp/ShowCode';
import { reverceBlock } from '../../../Utils/anims/reverceBlock';

interface ModsProps {
    AllDataOfPost: Array<{
        id: string;
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

            <div className={Styles.topBlock} id="topBlock">
                <CustomInput
                    mode={ModsOfInput.small}
                    value={AllDataOfPost[SelectMode.id].title || ''}
                    placeholder="Название для кода"
                    changeFunction={changeTitle}
                ></CustomInput>
                <div className={Styles.buttons}>
                    <ActiveButton
                        clickHandler={() => setIsModalErrorsOpen(true)}
                        Styles={Styles}
                        Class={Styles.alertButton}
                        icon="alert-triangle"
                    ></ActiveButton>
                    <ActiveButton
                        clickHandler={() => setIsModalClueCodeOpen(true)}
                        Styles={Styles}
                        Class={Styles.helpButton}
                        icon="help-circle"
                    ></ActiveButton>
                    <ActiveButton
                        clickHandler={() =>
                            reverceBlock('card', Styles.cardActive)
                        }
                        Styles={Styles}
                        Class={Styles.swapButton}
                        icon="refresh-ccw"
                    ></ActiveButton>
                </div>
            </div>

            <div className={Styles.card} id="card">
                <div className={classNames(Styles.face, Styles.front)}>
                    <div>
                        <LiveProvider enableTypeScript={true} code={UserCode}>
                            <LiveEditor
                                className={Styles.LiveEdit}
                                onChange={(e) => setUserCode(e)}
                            />
                        </LiveProvider>
                    </div>
                </div>
                <div className={classNames(Styles.face, Styles.back)}>
                    <h1>
                        {UserCode ? (
                            <div>
                                <ShowCode UserCode={UserCode} />
                            </div>
                        ) : (
                            'Здесь будет результат.'
                        )}
                    </h1>
                </div>
            </div>
        </>
    );
};

export default KodMode;
