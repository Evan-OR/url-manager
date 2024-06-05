type NextPreviousPageProps = {
    pageIndex: number;
    setPageIndex: (nextPage: number) => void;
};

export const NextPreviousPage = ({ pageIndex, setPageIndex }: NextPreviousPageProps) => {
    return (
        <div style={{ display: 'flex' }}>
            <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
                Previous
            </button>
            <div>{pageIndex + 1}</div>
            <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </div>
    );
};
