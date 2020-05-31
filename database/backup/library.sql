--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tbl_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_users (
    user_id text NOT NULL,
    user_username character varying(32) NOT NULL,
    user_fullname character varying(32) NOT NULL,
    user_email text NOT NULL,
    user_phone character varying(21),
    user_is_deleted boolean NOT NULL,
    "user_permission " character(2) NOT NULL,
    user_password text,
    user_salt text,
    user_iteration text
);


ALTER TABLE public.tbl_users OWNER TO postgres;

--
-- Data for Name: tbl_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_users (user_id, user_username, user_fullname, user_email, user_phone, user_is_deleted, "user_permission ", user_password, user_salt, user_iteration) FROM stdin;
2117110071	thienanh	Thiên Anh	taikhoanhoidai@gmail.com	05165165416	f	99	thienanh999	\N	\N
2117110070	usertest	Sinh viên	sinhvien@gmail.com	056465464541	f	01	123456	\N	\N
\.


--
-- Name: tbl_users tbl_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

