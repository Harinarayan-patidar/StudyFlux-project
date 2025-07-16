import React, { useEffect, useState } from 'react';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';
import { createRating } from '../../../services/operations/courseAPI';
import { toast } from 'react-hot-toast';

function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const onSubmit = async (data) => {
    if (data.courseRating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    setLoading(true);
    const result = await createRating({
      courseId: courseEntireData._id,
      rating: data.courseRating / 20, // convert to 0-5
      review: data.courseExperience,
    });
    setLoading(false);

    if (result?.success) {
      toast.success("Review submitted!");
      reset();
      setReviewModal(false);
    }
  };

  const handleRating = (rate) => {
    setValue("courseRating", rate * 20); // 5 stars → 100
  };

  if (!user || !courseEntireData) {
    return <p className="text-red-500">Error loading review modal. Please try again later.</p>;
  }

  return (
    <div className="bg-white text-black p-6 rounded-md shadow-md w-full max-w-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold">Add Review</p>
        <button onClick={() => setReviewModal(false)}>
          <MdCancel className="text-xl text-gray-700" />
        </button>
      </div>

      {/* Body */}
      <div className="space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={user?.image}
            alt="User"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-gray-500">Posting Publicly</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating */}
          <div className="flex flex-row items-center gap-4">
            <label className="text-sm font-medium whitespace-nowrap">Your Rating:</label>
            <Rating
              onClick={handleRating}
              initialValue={watch("courseRating") / 20}
              allowFraction
              size={24}
              fillColor="#facc15"
              emptyColor="#d1d5db"
              SVGtitle="Your rating"
              className='flex flex-row gap-2'
            />
          </div>

          {/* Review Textarea */}
          <div>
            <label htmlFor="courseExperience" className="block font-medium mb-1">
              Add your experience
            </label>
            <textarea
              id="courseExperience"
              placeholder="Write your feedback..."
              {...register("courseExperience", { required: true })}
              className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
            />
            {errors.courseExperience && (
              <p className="text-red-500 text-sm mt-1">Please add your experience</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setReviewModal(false)}
              className="px-4 py-2 border border-gray-400 rounded-md text-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-black rounded-md font-medium"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseReviewModal;
