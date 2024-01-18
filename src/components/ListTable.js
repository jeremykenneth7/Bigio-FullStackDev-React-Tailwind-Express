import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const StoryTable = ({ stories, handleEdit, handleDelete }) => {
    const dummyRows = Array.from({ length: 10 }, (_, rowIndex) => ({
        id: `dummy-${rowIndex}`,
        index: rowIndex,
    }));

    return (
        <div className="overflow-x-auto mr-12">
            <table className="w-full bg-white border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border border-slate-600">Title</th>
                        <th className="py-2 px-4 border border-slate-600">Writes</th>
                        <th className="py-2 px-4 border border-slate-600">Category</th>
                        <th className="py-2 px-4 border border-slate-600">Tags</th>
                        <th className="py-2 px-4 border border-slate-600">Status</th>
                        <th className="py-2 px-4 border border-slate-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyRows.map((dummyRow) => (
                        <tr key={dummyRow.id}>
                            <td className="py-4 px-4 border border-slate-600 text-center">
                                {stories.length > 0 ? stories[dummyRow.index]?.title : ''}
                            </td>
                            <td className="py-4 px-4 border border-slate-600 text-center">
                                {stories.length > 0 ? stories[dummyRow.index]?.author : ''}
                            </td>
                            <td className="py-4 px-4 border border-slate-600 text-center">
                                {stories.length > 0 ? stories[dummyRow.index]?.category : ''}
                            </td>
                            <td className="py-4 px-4 border border-slate-600 text-center">
                                {stories.length > 0 &&
                                    stories[dummyRow.index]?.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-block bg-[#788896] text-white rounded-full px-2 py-1 mr-1 mb-1"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                            </td>
                            <td className="py-4 px-4 border border-slate-600 text-center">
                                {stories.length > 0 && stories[dummyRow.index]?.status ? (
                                    <span className="inline-block bg-[#788896] text-white rounded-full px-2 py-1">
                                        {stories[dummyRow.index]?.status}
                                    </span>
                                ) : null}
                            </td>
                            <td className="py-4 px-4 border border-slate-600 text-center">
                                {stories.length > 0 && stories[dummyRow.index] ? (
                                    <>
                                        <Link to={`/editstory/${stories[dummyRow.index]?.id}`}>
                                            <button className="mr-2 text-blue-500 hover:text-blue-700">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </Link>
                                        <button
                                            className="text-black-500 "
                                            onClick={() => handleDelete(stories[dummyRow.index]?.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoryTable;