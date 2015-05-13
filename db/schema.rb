# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150513004632) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annotations", force: :cascade do |t|
    t.text     "annotation", null: false
    t.integer  "lyric_id",   null: false
    t.text     "lyric_text", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",    null: false
  end

  add_index "annotations", ["lyric_id"], name: "index_annotations_on_lyric_id", using: :btree
  add_index "annotations", ["user_id"], name: "index_annotations_on_user_id", using: :btree

  create_table "artists", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "artists", ["name"], name: "index_artists_on_name", unique: true, using: :btree

  create_table "lyrics", force: :cascade do |t|
    t.text     "lyric",       null: false
    t.integer  "artist_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "track_title", null: false
    t.integer  "user_id",     null: false
  end

  add_index "lyrics", ["artist_id"], name: "index_lyrics_on_artist_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string  "email",                                               null: false
    t.string  "username",                                            null: false
    t.string  "password_digest",                                     null: false
    t.string  "about_me",        default: "Tell us about yourself!"
    t.string  "session_token",                                       null: false
    t.integer "genius_iq",       default: 0
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
