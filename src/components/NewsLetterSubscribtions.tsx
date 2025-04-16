const NewsletterSubscribtion:React.FC =()=>{
    return(
        <div
        className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-5 mb-6 text-white`}
      >
        <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
        <p className="text-sm mb-4">
          Subscribe to our newsletter for the latest articles and updates.
        </p>
        <div className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-2 rounded-full text-sm border-none bg-white bg-opacity-20 placeholder-white placeholder-opacity-70 focus:bg-opacity-30 focus:outline-none"
          />
          <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap">
            Subscribe Now
          </button>
        </div>
      </div>
    )
}

export default NewsletterSubscribtion;