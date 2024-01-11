import React, { useEffect } from 'react';
import style from './confirmDialog.module.scss';
import AlertIcon from '../Icons/AlertIcon';

type ConfirmationDialogProps = {
    dialogRef: React.RefObject<HTMLDialogElement>;
    deleteLink: (e: React.MouseEvent<HTMLButtonElement>) => Promise<boolean>;
};

function ConfirmationDialog({ dialogRef, deleteLink }: ConfirmationDialogProps) {
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const successfullyDeleted = await deleteLink(e);
        if (successfullyDeleted) {
            dialogRef.current?.close();
            return;
        }

        setErrorMessage('Error deleting link');
    };

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
        <dialog className={style.dialog} ref={dialogRef}>
            <div className={style.dialogWrapper}>
                <div className={style.column}></div>
                <div className={style.content}>
                    <div className={style.titleWrapper}>
                        <AlertIcon styleClass={style.icon} />
                        <h2 className={style.title}>{errorMessage || 'Confirm Action'}</h2>
                    </div>
                    <p>Are you sure you want to delete this Link?</p>
                    <form method="dialog">
                        {!errorMessage && (
                            <button className={style.confirmBtn} onClick={handleDelete}>
                                Confirm
                            </button>
                        )}
                        <button className={style.btn} onClick={() => setErrorMessage('')}>
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default ConfirmationDialog;
