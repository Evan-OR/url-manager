import style from './registerFrom.module.scss';

type FormToggle = {
    text: string;
    btnText: string;
    toggleFormType: () => void;
};

function FormToggle(props: FormToggle) {
    const { text, btnText, toggleFormType } = props;

    return (
        <div className={style.formToggle}>
            {text}{' '}
            <span onClick={toggleFormType} className={style.link}>
                {btnText}
            </span>
        </div>
    );
}

export default FormToggle;
