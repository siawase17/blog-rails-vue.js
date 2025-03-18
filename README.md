# 📝 ブログプラットフォーム (Rails + Vue.js)

このプロジェクトは **Ruby on Rails** と **Vue.js** を使用したブログプラットフォームです。  
ユーザーは記事の投稿、編集、削除、カテゴリフィルター、検索機能を利用できます。

## 1️⃣ **バックエンド (Rails) のセットアップ**
✨ ruby、railsインストール  
✨ プロジェクト作成  
✨ ERD作成  
  - ユーザー、記事、カテゴリのリレーションを明確化
  - 記事はカテゴリに属する (1:N)
  - ユーザーは複数の投稿を持つ (1:N)

  ![image](https://github.com/user-attachments/assets/8a3034a2-0e8d-475f-9fa5-d9a616de74f0)  
✨ ERDベースのDBテーブル作成  
✨ model, controllers作成

## 2️⃣ **フロントエンド (Vue.js) のセットアップ**
✨ Vue.js プロジェクト作成 (create-vue)
✨ Vue Router 設定 (ルーティング機能追加)
✨ ページ別ビュー作成、コンポーネント作成

## 3️⃣ **機能説明**
### 👾 ブログ記事 CRUD(作成・閲覧・編集・削除)
📌 バックエンド
- posts_controller.rb にて以下のエンドポイントを作成
  - GET /api/posts : 記事一覧取得
  - GET /api/posts/:id : 記事詳細取得
  - POST /api/posts : 記事作成 (認証必須)
  - PATCH /api/posts/:id : 記事編集 (認証必須・投稿者のみ)
  - DELETE /api/posts/:id : 記事削除 (認証必須・投稿者のみ)
- カテゴリとのリレーションを設定 (belongs_to :category)
- 認証チェック (before_action :authenticate_user) を導入

📌 フロントエンド
- 記事一覧 (PostList.vue)
  - fetchPosts() を利用し GET /api/posts でデータ取得
- 記事詳細 (PostDetail.vue)
  - fetchPostDetail(id) を利用し GET /api/posts/:id でデータ取得
- 記事の削除ボタン (deletePost(id)) を実装し DELETE /api/posts/:id を呼び出し
- 記事作成 (PostCreate.vue)
  - createPost(postData) を利用し POST /api/posts で新規投稿
  - タイトル・本文・カテゴリを入力し、ボタンを押すと記事が作成される
- 記事編集 (PostEdit.vue)
  - updatePost(id, postData) を利用し PATCH /api/posts/:id で記事更新
### 👾 検索・フィルタリング機能
1️⃣データ読み込み(API呼び出し)  
- PostList.vueからfetchPosts()関数を使用して投稿データを取得
- Home.vueでselected Category Idとsearch Queryを管理し、これをPost List.vueに伝達
  
2️⃣ 検索ワード及びカテゴリー選択イベント検出  
- SearchBar.vueで検索語入力イベント発生時、上位コンポーネント(Home.vue)に伝達
- Category List.vueで特定カテゴリをクリックすると上位コンポーネント(Home.vue)に伝達
  
3️⃣検索ワードとカテゴリに基づいてフィルタリング  
- PostList.vueでfiltered Posts()をcomputedと定義し、search Queryとselected Category Idによってフィルタリング
- search Queryに入力した値がタイトルや本文に含まれている場合は、その投稿を表示
- selected Category Idがあれば該当IDに該当する掲示文のみ表示
  
4️⃣ フィルタリングされたデータを画面にレンダリング  
### 👾 ユーザー認証機能
1️⃣ ログインフォームの作成 (フロントエンド)  
2️⃣ APIを呼び出してログイン認証 (フロントエンド)  
3️⃣ 認証されたユーザーを管理 (バックエンド)  
- ログインしていないユーザーは、投稿や編集を行えないようにする (localStorage.getItem('authToken'))
### 👾 レスポンシブデザイン
- @media クエリを活用し、画面サイズに応じてレイアウトを変更
- カテゴリーリストや投稿一覧は、モバイルでは縦配置、PCでは横配置 に変更
- フォントサイズやボタンの大きさを調整 し、タップしやすいUIを意識

## 4️⃣ **任意で工夫したポイント**
### ✅JWTを用いたトークンベースの認証
- JWT（JSON Web Token）を使用したトークンベースの認証を導入。
- トークンを用いたAPIアクセス制限を実装し、認証されていないユーザーは投稿作成・編集・削除ができないように制限。
### ✅ コンポーネントを分割して再利用性と可読性を向上
💡最大限コンポーネント化を意識して実装  
(ボタン、検索バーやカテゴリフィルタ、記事関連のコンポーネント
、ヘッダー)
