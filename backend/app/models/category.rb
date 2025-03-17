class Category < ApplicationRecord
    has_many :posts, dependent: :nullify  # 카테고리 삭제 시 관련된 게시글의 category_id를 NULL로 변경
    validates :name, presence: true, uniqueness: true
end
