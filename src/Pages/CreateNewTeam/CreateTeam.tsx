import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import Styles from './Styles.module.scss';
import CustomInput from '../../Components/minicops/input';
import { ChangeEvent, useState } from 'react';
import CustomTextarea from '../../Components/minicops/textarea';
import ButtonVoid from '../../Components/minicops/B-void';
import { addNewTeam } from '../../Api/Teams/addNewTeam';
import { addToSubscriptions } from '../../Api/Users/addToSubscriptions';

const CreateTeam = () => {
    const { UserCanChanging, UserId } = useAuth();
    const navigate = useNavigate();

    const [inputTitle, setTitle] = useState('');
    const [inputDescript, setDescript] = useState('');

    const [inputProjectName, setProjectName] = useState('');
    const [inputProjectDesc, setProjectDescript] = useState('');

    const [selectImage, setSelectImage] = useState('');

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSelectImage(reader.result as string);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    function createNewTeam() {
        if (
            inputTitle &&
            inputDescript &&
            inputProjectName &&
            inputProjectDesc &&
            selectImage &&
            UserId
        ) {
            const NewTeam = {
                title: inputTitle,
                desc: inputDescript,
                projectTitle: inputProjectName,
                projectDesc: inputProjectDesc,
                image: selectImage,
                teamMembers: [{ UserId: UserId, UserRole: 'Administrator' }],
            };
            addNewTeam(NewTeam).then((teamId) => {
                addToSubscriptions('team', teamId, UserId);
                clearInputs();
                navigate('/');
            });
        }
    }
    function clearInputs() {
        setTitle('');
        setDescript('');
        setProjectName('');
        setProjectDescript('');
        setSelectImage('');
    }

    return UserCanChanging ? (
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
                            stateValue={inputTitle}
                        ></CustomInput>
                        <CustomInput
                            changeFunction={(e) => setDescript(e.target.value)}
                            placeholder="Описание"
                            mode="large"
                            stateValue={inputDescript}
                        ></CustomInput>
                    </div>
                </div>
                <div className={Styles.aboutProject}>
                    <CustomInput
                        changeFunction={(e) => setProjectName(e.target.value)}
                        placeholder="Проект над которым работаете"
                        mode="large"
                        stateValue={inputProjectName}
                    ></CustomInput>
                    <CustomTextarea
                        changeFunction={(e) =>
                            setProjectDescript(e.target.value)
                        }
                        placeholder="Дайте описание своему проекту"
                        mode="large"
                        stateValue={inputProjectDesc}
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
    ) : (
        <Navigate to={'/'}></Navigate>
    );
};

export default CreateTeam;
