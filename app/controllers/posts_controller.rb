class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]
  before_action :set_params, only: [:show]

  def index
    @posts = Post.order("created_at DESC").page(params[:page]).per(6)
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.create(post_params)
    if @post.save
      redirect_to root_path
    else
      redirect_to new_post_path
    end
  end

  def show
  end

  private

  def post_params
    params.require(:post).permit(:title, :image, :text, :longitude, :latitude).merge(user_id: current_user.id)
  end

  def set_params
    @post = Post.find(params[:id])
  end
end