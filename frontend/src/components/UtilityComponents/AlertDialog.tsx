import { useEffect } from 'react';
import AlertIcon from '../Icons/AlertIcon';
import style from './alertDialog.module.scss';

type AlertDialogProps = {
    dialogRef: React.RefObject<HTMLDialogElement>;
};

function AlertDialog({ dialogRef }: AlertDialogProps) {
    useEffect(() => {
        const dialog = dialogRef.current;
        const closeDialog = (e: MouseEvent) => {
            if (e.target === dialog) {
                dialog?.close();
            }
        };
        dialog?.addEventListener('click', closeDialog);
        return () => {
            dialog?.removeEventListener('click', closeDialog);
        };
    }, []);

    return (
        <dialog ref={dialogRef} className={style.dialogWrapper}>
            <div className={style.contentWrapper}>
                <div className={style.column}></div>

                <div className={style.content}>
                    <div className={style.titleWrapper}>
                        <AlertIcon styleClass={style.icon} />
                        <h2 className={style.title}>Invalid URL</h2>
                    </div>
                    <p className={style.text}>Make sure you are providing a full and valid URL.</p>
                    <form className={style.form} method="dialog">
                        <button className={style.btn} autoFocus>
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default AlertDialog;
