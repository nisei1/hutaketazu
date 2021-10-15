class HomeController < ApplicationController
  protect_from_forgery except: :like
  def index
    @posts = Post.find_by_sql("select * from posts where not user_id = #{current_user.id} and id not in (select post_id from likes where user_id = #{current_user.id})").to_json
    logger.debug(@posts)
  end

  def like

    Rails.logger.info params.inspect
    current_user.likes.create(post_id: params[:post_id]) #user_idとpost_idの二つを代入
    render json: {}, status: 200
  end
  # def like
  #   begin
  #     current_user.likes.create(post_id: params[:post_id]) #user_idとpost_idの二つを代入
  #     render json: {}, status: 200
  #   rescue => e
  #     p e
  #     render json: {}, status: 500
  #   end
  # end
end
