class PostsController < ApplicationController
  before_action :set_params, only: [:show]

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
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
    params.require(:post).permit(:title, :image, :text, :longitude, :latitude)
  end

  def set_params
    @post = Post.find(params[:id])
  end
end