module Api
    class AuthController < ApplicationController
      skip_before_action :authenticate_user, only: [ :login ]

      def login
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
          token = encode_token({ user_id: user.id })
          render json: { token: token, user: user.as_json(only: [ :id, :email ]) }
        else
          render json: { error: "이메일 또는 비밀번호가 올바르지 않습니다." }, status: :unauthorized
        end
      end

      def logout
        render json: { message: "로그아웃 되었습니다." }
      end
    end
end
