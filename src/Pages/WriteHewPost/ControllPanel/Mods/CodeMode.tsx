import { FC } from 'react';
import ShowCode from '../../../../Components/ShowPosts/postsComp/ShowCode';

interface CodeMode {
    openMode: () => void;
    className: string;
    id: number;
    Code: string;
}

const CodeMode: FC<CodeMode> = ({ openMode, id, Code, className }) => {
    return (
        <div onClick={openMode} className={className} key={id}>
            <div>
                <ShowCode UserCode={Code} />
            </div>
        </div>
    );
};
export default CodeMode;
