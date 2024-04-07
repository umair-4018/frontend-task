import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../reducers/BookReducer";
import { toast } from "react-toastify";

const CreateBooks = ({ edit,setIsOpen }) => { // Destructure the edit object here
  
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: edit ? edit.title : "",
            authorName: edit ? edit.authorName : "",
            publicationHouse: edit ? edit?.publicationHouse : "",
            publicationYear: edit ? edit?.publicationYear : "",
            genre: edit ? edit.genre._id : "",
            publicationDate: edit ? edit.publicationDate.slice(0, 10) : ""


        }
    });

    const dispatch = useDispatch();
    useEffect(() => {
        // Dispatch the fetchGenre action when the component mounts
        actions.fetchGenre(dispatch);
    }, [dispatch]);

    const genreData = useSelector((state) => state.book.genre);

    const onSubmit = async (data) => {
        if(edit){
            try {
          
                const response = await actions.updatePrompt(dispatch, edit?._id,data);
                console.log(response,"response");
                if (response && response.status === 200) {
                    toast.success("Book updated successfully");
                    reset();
                    setIsOpen(false)
                    actions.fetchBooks(dispatch);
                } else if (response?.data?.message) {
                    toast.error(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error("Error during book creation:", error);
                toast.error("Book creation failed. Please try again.");
            }
        }
        else{
        try {
          
            const response = await actions.submitPrompt(dispatch, data);
            if (response && response.status === 201) {
                toast.success("Book created successfully");
                reset();
                actions.fetchBooks(dispatch);
            } else if (response?.data?.message) {
                toast.error(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during book creation:", error);
            toast.error("Book creation failed. Please try again.");
        }
    };
}

    return (
        <div className="">
            <div className="max-w-[1140px] mx-auto">
                <div className="flex gap-5">
                    <div className="w-full">
                        <h3 className="uppercase mb-5 text-[#222] font-bold tracking-wide text-2xl text-center">
                            {edit ? "Edit Book" : "Create Book"}
                        </h3>
                        <div className="p-[30px]">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-wrap">
                                    <div className="w-1/2 pr-3">
                                        <div className="flex flex-col">
                                            <label htmlFor="title" className="capitalize text-[#333] text-sm font-semibold mb-2">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                placeholder="Title"
                                                className="text-xs py-[17px] px-[25px] mb-[30px] border-[#ddd]"
                                                {...register("title", { required: "Title is required" })}
                                            />
                                            {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                                        </div>
                                    </div>
                                    <div className="w-1/2 pl-3">
                                        <div className="flex flex-col">
                                            <label htmlFor="authorName" className="capitalize text-[#333] text-sm font-semibold mb-2">
                                                Author Name
                                            </label>
                                            <input
                                                type="text"
                                                id="authorName"
                                                placeholder="Author Name"
                                                className="text-xs py-[17px] px-[25px] mb-[30px] border-[#ddd]"
                                                {...register("authorName", { required: "Author Name is required" })}
                                            />
                                            {errors.authorName && <span className="text-red-500 text-xs">{errors.authorName.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-1/2 pr-3">
                                        <div className="flex flex-col">
                                            <label htmlFor="publicationHouse" className="capitalize text-[#333] text-sm font-semibold mb-2">
                                                Publication House
                                            </label>
                                            <input
                                                type="text"
                                                id="publicationHouse"
                                                placeholder="Publication House"
                                                className="text-xs py-[17px] px-[25px] mb-[30px] border-[#ddd]"
                                                {...register("publicationHouse", { required: "Publication House is required" })}
                                            />
                                            {errors.publicationHouse && <span className="text-red-500 text-xs">{errors.publicationHouse.message}</span>}
                                        </div>
                                    </div>
                                    <div className="w-1/2 pl-3">
                                        <div className="flex flex-col">
                                            <label htmlFor="publicationDate" className="capitalize text-[#333] text-sm font-semibold mb-2">
                                                Publication Date
                                            </label>
                                            <input
                                                type="date"
                                                id="publicationDate"
                                                className="text-xs py-[17px] px-[25px] mb-[30px] border-[#ddd]"
                                                {...register("publicationDate", { required: "Publication Date is required" })}
                                            />
                                            {errors.publicationDate && <span className="text-red-500 text-xs">{errors.publicationDate.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-1/2 pr-3">
                                        <div className="flex flex-col">
                                            <label htmlFor="genre" className="capitalize text-[#333] text-sm font-semibold mb-2">
                                                Genre
                                            </label>
                                            <select
                                                id="genre"
                                                className="text-xs py-[17px] px-[25px] mb-[30px] border-[#ddd]"
                                                {...register("genre", { required: "Genre is required" })}
                                            >
                                                <option value="">Select Genre</option>
                                                {genreData.map((genre) => (
                                                    <option key={genre._id} value={genre._id} selected={edit && edit.genre._id === genre._id}>{genre.title}</option>
                                                ))}
                                            </select>
                                            {errors.genre && <span className="text-red-500 text-xs">{errors.genre.message}</span>}
                                        </div>
                                    </div>
                                    <div className="w-1/2 pl-3">
                                        <div className="flex flex-col">
                                            <label htmlFor="publicationYear" className="capitalize text-[#333] text-sm font-semibold mb-2">
                                                Publication Year
                                            </label>
                                            <input
                                                type="number"
                                                id="publicationYear"
                                                placeholder="Publication Year"
                                                className="text-xs py-[17px] px-[25px] mb-[30px] border-[#ddd]"
                                                {...register("publicationYear", { required: "Publication Year is required" })}
                                            />
                                            {errors.publicationYear && <span className="text-red-500 text-xs">{errors.publicationYear.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="px-[29px] py-[13px] text-sm font-bold text-white border-2 border-[#b0574f] transition-all duration-300 bg-[0px] hover:bg-white hover:text-black hover:bg-[100%] uppercase"
                                    style={{
                                        backgroundSize: "560px",
                                        backgroundImage: "linear-gradient(30deg, #b0574f 50%, transparent 50%)",
                                    }}
                                >
                                    {edit ? "Update Book" : "Create Book"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBooks;
