const Post = ({ post }) => (
  <div className="p-4 sm:w-full md:w-1/2 lg:w-1/3">
    {/* Post content goes here */}
    <div className="rounded-lg bg-white p-6">
      <img src={post.image} alt="Post" className=" h-48 w-full rounded-md object-cover" />
      <div className="align-center my-4 flex gap-2">
        <img src={post.avatar} alt="Author" className=" h-10 w-10 rounded-full" />
        <h2 className=" text-xl font-medium leading-10">{`${post.firstName} ${post.lastName}`}</h2>
      </div>
      <p className="text-gray-700">{post.writeup}</p>
    </div>
  </div>
);

export default Post;

Post.propTypes = {
  post: {},
};
