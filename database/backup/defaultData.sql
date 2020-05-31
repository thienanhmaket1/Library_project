CREATE TABLE public.tbl_settings
(
    settings_id SERIAL,
    office_path_value text COLLATE pg_catalog."default",
    qc_path_value text COLLATE pg_catalog."default",
    theme_color text COLLATE pg_catalog."default",
    created_by text COLLATE pg_catalog."default",
    created_date timestamp with time zone,
    updated_by text COLLATE pg_catalog."default",
    updated_date timestamp with time zone,
    CONSTRAINT tbl_settings_pkey PRIMARY KEY (settings_id)
)

TABLESPACE pg_default;

ALTER TABLE public.tbl_settings
    OWNER to postgres;

ALTER TABLE public.tbl_settings
    ADD COLUMN temp_path text;

INSERT INTO public.tbl_settings(
	office_path_value, qc_path_value, theme_color, created_by, created_date)
	VALUES ('', '', 'default', 'admin', now());

-- ==================================================

ALTER TABLE public.tbl_users
    ADD COLUMN user_group text;

ALTER TABLE public.tbl_users
    ADD COLUMN user_salt text;

ALTER TABLE public.tbl_users
    ADD COLUMN user_iteration integer;

--======================================================

ALTER TABLE public.tbl_folders
    ADD COLUMN folder_authorized_users text[];

ALTER TABLE public.tbl_files
    ADD COLUMN file_authorized_users text[];
	
-- =========================
-- Table: public.tbl_messages

-- DROP TABLE public.tbl_messages;

CREATE TABLE public.tbl_messages
(
    message_id integer NOT NULL DEFAULT nextval('tbl_messages_message_id_seq'::regclass),
    message_content text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone,
    created_by text COLLATE pg_catalog."default",
    message_group text COLLATE pg_catalog."default",
    CONSTRAINT tbl_messages_pkey PRIMARY KEY (message_id)
)

TABLESPACE pg_default;

ALTER TABLE public.tbl_messages
    OWNER to postgres;
	

ALTER TABLE public.tbl_folders
    ADD COLUMN folder_term_year text;

ALTER TABLE public.tbl_folders
    ADD COLUMN folder_report boolean;

ALTER TABLE public.tbl_folders
    ADD COLUMN folder_note boolean;

ALTER TABLE public.tbl_files
    ADD COLUMN file_group text;
    
