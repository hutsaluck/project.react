import {FC} from 'react';
import {useSearchParams} from 'react-router';

interface IProps {
    totalPages: number;
}

export const PaginationComponent: FC<IProps> = ({ totalPages }) => {
    const [searchParams, setSearchParams] = useSearchParams({ page: '1' });

    const currentPage: number = Number(searchParams.get('page') || '1');
    const prevPage: string = (currentPage - 1).toString();
    const nextPage: string = (currentPage + 1).toString();

    const paginationItems = [];

    for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
            page === currentPage ? (
                <span
                    key={page}
                    className="text-gray-900 relative px-2"
                >
          {page}
        </span>
            ) : (
                <button
                    key={page}
                    onClick={() => setSearchParams({ page: page.toString() })}
                    className="cursor-pointer text-gray-500 hover:text-gray-900 relative px-2 after:content-[''] after:absolute after:bottom-[-10px] after:left-1 after:w-[80%] after:border-b-2 after:border-gray-600 hover:after:left-0 hover:after:w-full"
                >
                    {page}
                </button>
            )
        );
    }

    return (
        <div
            className={`grid ${totalPages > 30 ? 'grid-cols-[repeat(30,20px)]' : 'grid-flow-col'} gap-5 justify-center items-center w-1/5 mx-auto my-10`}
        >
            {currentPage > 1 && (
                <button
                    key="prev"
                    onClick={() => setSearchParams({ page: prevPage })}
                    className="cursor-pointer text-gray-500 hover:text-gray-900 relative px-2 after:content-[''] after:absolute after:bottom-[-10px] after:left-1 after:w-[80%] after:border-b-2 after:border-gray-600 hover:after:left-0 hover:after:w-full"
                >
                    &#10094;
                </button>
            )}
            {paginationItems.map(paginationItem => paginationItem)}
            {currentPage < totalPages && (
                <button
                    key="next"
                    onClick={() => setSearchParams({ page: nextPage })}
                    className="cursor-pointer text-gray-500 hover:text-gray-900 relative px-2 after:content-[''] after:absolute after:bottom-[-10px] after:left-1 after:w-[80%] after:border-b-2 after:border-gray-600 hover:after:left-0 hover:after:w-full"
                >
                    &#10095;
                </button>
            )}
        </div>
    );
};