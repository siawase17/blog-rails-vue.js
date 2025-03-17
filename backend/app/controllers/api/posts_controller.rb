module Api
  class PostsController < ApplicationController
    before_action :set_post, only: [ :show, :update, :destroy ]

    # 게시글 목록 조회
    def index
      posts = Post.includes(:category, :user).all
      if posts.present?
        render json: posts.as_json(include: [ :category, :user ])
      else
        render json: { message: "게시글이 없습니다." }
      end
    end

    # 게시글 상세 조회
    def show
      render json: @post.as_json(include: [ :category, :user ])
    end

    # 게시글 생성
    def create
      return render json: { error: "認証が必要です。" }, status: :unauthorized unless current_user

      category = Category.find_by(id: post_params[:category_id])
      return render json: { error: "カテゴリが存在しません" }, status: :unprocessable_entity unless category

      post = current_user.posts.new(post_params) # 현재 로그인한 사용자의 게시글로 설정

      if post.save
        render json: post, status: :created, include: [ :category, :user ]
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # 게시글 수정 (로그인한 사용자만 가능)
    def update
      unless @post.user == current_user
        return render json: { error: "この投稿を編集する権限がありません。" }, status: :forbidden
      end

      if @post.update(post_params)
        render json: @post, include: [ :category, :user ]
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # 게시글 삭제 (로그인한 사용자만 가능)
    def destroy
      unless @post.user == current_user
        return render json: { error: "この投稿を削除する権限がありません。" }, status: :forbidden
      end

      @post.destroy
      head :no_content
    end

    private

    # 게시글 찾기 (존재하지 않으면 404 응답)
    def set_post
      @post = Post.find_by(id: params[:id])

      unless @post
        render json: { error: "해당 ID의 게시글을 찾을 수 없습니다." }, status: :not_found
      end
    end

    # Strong Parameters
    def post_params
      params.require(:post).permit(:title, :content, :category_id, :user_id)
    end
  end
end
