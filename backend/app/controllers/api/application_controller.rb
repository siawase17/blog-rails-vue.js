module Api
  class ApplicationController < ActionController::API
    before_action :authenticate_user

    def encode_token(payload)
      JWT.encode(payload, Rails.application.secret_key_base)
    end

    def decode_token
      auth_header = request.headers["Authorization"]
      return nil unless auth_header

      token = auth_header.split(" ").last
      begin
        JWT.decode(token, Rails.application.secret_key_base, true, algorithm: "HS256")
      rescue JWT::DecodeError
        nil
      end
    end

    def current_user
      decoded_token = decode_token
      if decoded_token
        user_id = decoded_token[0]["user_id"]
        @current_user ||= User.find_by(id: user_id)
      end
    end

    def authenticate_user
      render json: { error: "로그인이 필요합니다." }, status: :unauthorized unless current_user
    end
  end
end
