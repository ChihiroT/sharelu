class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]
  before_action :set_params, only: [:show, :destroy]

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
    @comments = @post.comments.includes(:user)
    @comment = Comment.new
    @posts = @user.posts.where.not(id: @post.id).order("created_at DESC").limit(6)
  end

  def destroy
    if @post.user == current_user || current_user.admin?
      @post.destroy
    else
      redirect_to root_path
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :image, :text, :longitude, :latitude).merge(user_id: current_user.id)
  end

  def set_params
    @post = Post.find(params[:id])
    @user = @post.user
  end
end