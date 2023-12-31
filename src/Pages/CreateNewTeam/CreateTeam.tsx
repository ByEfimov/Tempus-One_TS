import Styles from './Styles.module.scss';
import { addNewTeam } from 'Api/Teams/addNewTeam';
import { Subscription } from 'Api/Users/Interaction/Subscription';
import changeUserData from 'Api/Users/changeUserData';
import ButtonVoid from 'Components/MiniComponents/button';
import CustomInput from 'Components/MiniComponents/input';
import CustomTextarea from 'Components/MiniComponents/textarea';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import { useAuth } from 'Hooks/useAuth';
import { handleImageUpload } from 'Utils/Handlers/HandlerImageUpload';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
    const { UserCanChanging, UserId, UserIsAuth, UserExperience } = useAuth();
    const navigate = useNavigate();

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [ProjectName, setProjectName] = useState('');
    const [ProjectDescription, setProjectDescription] = useState('');
    const [selectImage, setSelectImage] = useState('');

    function createNewTeam() {
        if (
            Title &&
            Description &&
            ProjectName &&
            ProjectDescription &&
            selectImage &&
            UserId
        ) {
            const NewTeam = {
                title: Title,
                desc: Description,
                projectTitle: ProjectName,
                projectDesc: ProjectDescription,
                image: selectImage,
                members: {
                    [UserId]: { UserId: UserId, UserRole: 'Administrator' },
                },
            };
            addNewTeam(NewTeam).then((teamId) => {
                Subscription('team', teamId, UserId);
                changeUserData('experience', UserExperience + 80, UserId);
                clearInputs();
                navigate('/');
            });
        } else {
            ErrorNotification('Не все поля заполнены.');
        }
    }
    function clearInputs() {
        setTitle('');
        setDescription('');
        setProjectName('');
        setProjectDescription('');
        setSelectImage('');
    }

    if (UserCanChanging) {
        return (
            <div className={Styles.Container}>
                <h1 className={Styles.title}>Создать команду</h1>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={Styles.HeadInputs}>
                        {selectImage ? (
                            <img
                                src={selectImage}
                                alt=""
                                className={Styles.image}
                            />
                        ) : (
                            <input
                                type="file"
                                onChange={(e) =>
                                    handleImageUpload(e, setSelectImage)
                                }
                                className={Styles.image}
                            />
                        )}

                        <div>
                            <CustomInput
                                changeFunction={(e) => setTitle(e.target.value)}
                                placeholder="Название"
                                mode="large"
                                stateValue={Title}
                            ></CustomInput>
                            <CustomInput
                                changeFunction={(e) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Описание"
                                mode="large"
                                stateValue={Description}
                            ></CustomInput>
                        </div>
                    </div>
                    <div className={Styles.aboutProject}>
                        <CustomInput
                            changeFunction={(e) =>
                                setProjectName(e.target.value)
                            }
                            placeholder="Проект над которым работаете"
                            mode="large"
                            stateValue={ProjectName}
                        ></CustomInput>
                        <CustomTextarea
                            changeFunction={(e) =>
                                setProjectDescription(e.target.value)
                            }
                            placeholder="Дайте описание своему проекту"
                            mode="large"
                            stateValue={ProjectDescription}
                        ></CustomTextarea>
                    </div>
                    <ButtonVoid
                        title="Создать"
                        clickHandler={() => {
                            createNewTeam();
                        }}
                    ></ButtonVoid>
                </form>
            </div>
        );
    } else if (!UserCanChanging) {
        if (!UserIsAuth) {
            ErrorNotification('Нужно войти в аккаунт.');
        } else {
            ErrorNotification('Нужно подтвердить почту.');
        }
    }
};

export default CreateTeam;
