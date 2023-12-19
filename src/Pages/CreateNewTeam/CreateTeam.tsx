import { useNavigate } from 'react-router-dom';
import { useAuth } from 'Hooks/useAuth';
import Styles from './Styles.module.scss';
import CustomInput from 'Components/MiniComponents/input';
import { ChangeEvent, useState } from 'react';
import CustomTextarea from 'Components/MiniComponents/textarea';
import ButtonVoid from 'Components/MiniComponents/button';
import { addNewTeam } from 'Api/Teams/addNewTeam';
import { addToSubscriptionsForUser } from 'Api/Users/addToSubscriptionsForUser';
import { ErrorNotification } from 'Components/Notifications/Notifications';

const CreateTeam = () => {
    const { UserCanChanging, UserId, UserIsAuth } = useAuth();
    const navigate = useNavigate();

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [ProjectName, setProjectName] = useState('');
    const [ProjectDescription, setProjectDescription] = useState('');
    const [selectImage, setSelectImage] = useState('');

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = () => {
            setSelectImage(reader.result as string);
        };
        if (e.target.files?.[0]) {
            reader.readAsDataURL(e.target.files?.[0]);
        }
    };

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
                addToSubscriptionsForUser('team', teamId, UserId);
                clearInputs();
                navigate('/');
            });
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
                                onChange={(e) => handleImageUpload(e)}
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
