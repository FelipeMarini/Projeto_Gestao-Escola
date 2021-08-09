﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using projeto_inicial.Domains;

#nullable disable

namespace projeto_inicial.Context
{
    public partial class GufiContext : DbContext
    {
        public GufiContext()
        {
        }

        public GufiContext(DbContextOptions<GufiContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Equipamento> Equipamentos { get; set; }
        public virtual DbSet<Sala> Salas { get; set; }
        public virtual DbSet<SalaEquipamento> SalaEquipamentos { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-7SJR3UU\\SQLEXPRESS; Initial Catalog=Projeto_Inicial; user id=sa; pwd=senai@132;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Equipamento>(entity =>
            {
                entity.HasKey(e => e.IdEquipamento)
                    .HasName("PK__Equipame__E309D87F8099CCC9");

                entity.ToTable("Equipamento");

                entity.Property(e => e.DescricaoEquipamento)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.MarcaEquipamento)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.TipoEquipamento)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Sala>(entity =>
            {
                entity.HasKey(e => e.IdSala)
                    .HasName("PK__Sala__A04F9B3BC7E83706");

                entity.ToTable("Sala");

                entity.Property(e => e.NomeSala)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SalaEquipamento>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("SalaEquipamento");

                entity.Property(e => e.DataEntrada).HasColumnType("datetime");

                entity.Property(e => e.DataSaida).HasColumnType("datetime");

                entity.HasOne(d => d.IdEquipamentoNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdEquipamento)
                    .HasConstraintName("FK__SalaEquip__IdEqu__2B3F6F97");

                entity.HasOne(d => d.IdSalaNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdSala)
                    .HasConstraintName("FK__SalaEquip__IdSal__2A4B4B5E");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuario__5B65BF972535C265");

                entity.ToTable("Usuario");

                entity.HasIndex(e => e.Email, "UQ__Usuario__A9D105346EB8E14A")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
