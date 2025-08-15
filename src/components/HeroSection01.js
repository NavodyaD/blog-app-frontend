import React from 'react';

const HeroSection01 = () => {
  return (
    <section className="py-6 px-6 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div className="flex flex-col items-center text-center p-6 rounded-lg">
          <img src="../assets/svgs/thinking-face-animate.svg" alt="Creative Writing" className="w-60 mb-4" />
          <h3 className="text-xl font-bold mb-2">Creative Writing</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Unleash your creativity and write amazing stories with easy tools and editor.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg">
          <img src="../assets/svgs/novelist-writing-animate.svg" alt="Engaging Posts" className="w-60 mb-4" />
          <h3 className="text-xl font-bold mb-2">Engaging Posts</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Gain engaging interactions to capture attention and spark discussions.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg">
          <img src="../assets/svgs/positive-thinking-animate.svg" alt="Community Insights" className="w-60 mb-4" />
          <h3 className="text-xl font-bold mb-2">Positive Insights</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Stay informed with the latest trends and insights from our community.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection01;
