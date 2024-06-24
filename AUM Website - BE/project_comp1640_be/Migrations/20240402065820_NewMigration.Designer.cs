﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using project_comp1640_be.Data;

#nullable disable

namespace projectcomp1640be.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240402065820_NewMigration")]
    partial class NewMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("project_comp1640_be.Model.Academic_Years", b =>
                {
                    b.Property<int>("academic_year_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("academic_year_id"));

                    b.Property<DateTime>("academic_year_ClosureDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("academic_year_FinalClosureDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("academic_year_title")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("academic_year_id");

                    b.ToTable("Academic_Years", (string)null);
                });

            modelBuilder.Entity("project_comp1640_be.Model.Contributions", b =>
                {
                    b.Property<int>("contribution_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("contribution_id"));

                    b.Property<string>("IsEnabled")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<string>("IsPublic")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<string>("IsSelected")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<string>("IsView")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<int>("contribution_academic_years_id")
                        .HasColumnType("int");

                    b.Property<string>("contribution_content")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("contribution_image")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("contribution_submition_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("contribution_title")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<int>("contribution_user_id")
                        .HasColumnType("int");

                    b.HasKey("contribution_id");

                    b.HasIndex("contribution_academic_years_id");

                    b.HasIndex("contribution_user_id");

                    b.ToTable("Contributions", (string)null);
                });

            modelBuilder.Entity("project_comp1640_be.Model.Faculties", b =>
                {
                    b.Property<int>("faculty_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("faculty_id"));

                    b.Property<string>("faculty_name")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("faculty_id");

                    b.ToTable("Faculties", (string)null);
                });

            modelBuilder.Entity("project_comp1640_be.Model.Marketing_Comments", b =>
                {
                    b.Property<int>("comment_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("comment_id"));

                    b.Property<string>("comment_content")
                        .IsRequired()
                        .HasColumnType("varchar(2000)");

                    b.Property<int>("comment_contribution_id")
                        .HasColumnType("int");

                    b.Property<DateTime>("comment_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("comment_user_id")
                        .HasColumnType("int");

                    b.HasKey("comment_id");

                    b.HasIndex("comment_contribution_id");

                    b.HasIndex("comment_user_id");

                    b.ToTable("Marketing_Comments", (string)null);
                });

            modelBuilder.Entity("project_comp1640_be.Model.Page_Views", b =>
                {
                    b.Property<int>("page_view_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("page_view_id"));

                    b.Property<string>("browser_name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("page_view_name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<int>("page_view_user_id")
                        .HasColumnType("int");

                    b.Property<DateTime>("time_stamp")
                        .HasColumnType("datetime2");

                    b.Property<int>("total_time_access")
                        .HasColumnType("int");

                    b.HasKey("page_view_id");

                    b.HasIndex("page_view_user_id");

                    b.ToTable("Page_Views", (string)null);
                });

            modelBuilder.Entity("project_comp1640_be.Model.Roles", b =>
                {
                    b.Property<int>("role_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("role_id"));

                    b.Property<string>("role_name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.HasKey("role_id");

                    b.ToTable("Roles", (string)null);
                });

            modelBuilder.Entity("project_comp1640_be.Model.Users", b =>
                {
                    b.Property<int>("user_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("user_id"));

                    b.Property<DateTime?>("last_login")
                        .HasColumnType("datetime2");

                    b.Property<string>("refesh_token")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime?>("refesh_token_exprytime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("reset_password_exprytime")
                        .HasColumnType("datetime2");

                    b.Property<string>("reset_password_token")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("token")
                        .HasColumnType("varchar(255)");

                    b.Property<int?>("total_work_duration")
                        .HasColumnType("int");

                    b.Property<string>("user_avatar")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("user_confirm_password")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("user_email")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<int>("user_faculty_id")
                        .HasColumnType("int");

                    b.Property<string>("user_password")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<int>("user_role_id")
                        .HasColumnType("int");

                    b.Property<string>("user_status")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<string>("user_username")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("user_id");

                    b.HasIndex("user_faculty_id");

                    b.HasIndex("user_role_id");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("project_comp1640_be.Model.Contributions", b =>
                {
                    b.HasOne("project_comp1640_be.Model.Academic_Years", "academic_years")
                        .WithMany("contributions")
                        .HasForeignKey("contribution_academic_years_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("project_comp1640_be.Model.Users", "users")
                        .WithMany("Contributions")
                        .HasForeignKey("contribution_user_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("academic_years");

                    b.Navigation("users");
                });

            modelBuilder.Entity("project_comp1640_be.Model.Marketing_Comments", b =>
                {
                    b.HasOne("project_comp1640_be.Model.Contributions", "contributions")
                        .WithMany("Marketing_Comments")
                        .HasForeignKey("comment_contribution_id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("project_comp1640_be.Model.Users", "users")
                        .WithMany("Marketing_Comments")
                        .HasForeignKey("comment_user_id")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("contributions");

                    b.Navigation("users");
                });

            modelBuilder.Entity("project_comp1640_be.Model.Page_Views", b =>
                {
                    b.HasOne("project_comp1640_be.Model.Users", "users")
                        .WithMany("Page_Views")
                        .HasForeignKey("page_view_user_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("users");
                });

            modelBuilder.Entity("project_comp1640_be.Model.Users", b =>
                {
                    b.HasOne("project_comp1640_be.Model.Faculties", "faculties")
                        .WithMany("users")
                        .HasForeignKey("user_faculty_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("project_comp1640_be.Model.Roles", "role")
                        .WithMany("users")
                        .HasForeignKey("user_role_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("faculties");

                    b.Navigation("role");
                });

            modelBuilder.Entity("project_comp1640_be.Model.Academic_Years", b =>
                {
                    b.Navigation("contributions");
                });

            modelBuilder.Entity("project_comp1640_be.Model.Contributions", b =>
                {
                    b.Navigation("Marketing_Comments");
                });

            modelBuilder.Entity("project_comp1640_be.Model.Faculties", b =>
                {
                    b.Navigation("users");
                });

            modelBuilder.Entity("project_comp1640_be.Model.Roles", b =>
                {
                    b.Navigation("users");
                });

            modelBuilder.Entity("project_comp1640_be.Model.Users", b =>
                {
                    b.Navigation("Contributions");

                    b.Navigation("Marketing_Comments");

                    b.Navigation("Page_Views");
                });
#pragma warning restore 612, 618
        }
    }
}
