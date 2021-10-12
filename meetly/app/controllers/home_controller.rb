class HomeController < ApplicationController
  protect_from_forgery except: :like  
  def index
    @posts=Post.where().to_json
  end

  def like
    begin
      current_user.likes.create(post_id: params[:post_id]) #user_idとpost_idの二つを代入
      render json: {}, status: 200
    rescue => e
      p e
      render json: {}, status: 500
    end
  end
end
