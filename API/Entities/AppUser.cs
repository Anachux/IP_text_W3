﻿using System.ComponentModel.DataAnnotations.Schema;
using API.Extensions;
using Company.ClassLibrary1;
using Microsoft.AspNetCore.Identity;
namespace API.Entities;
[Table("Photos")]
public class AppUser: IdentityUser<int>
{
      public ICollection<AppUserRole> UserRoles { get; set; }


  //snippet: typing "prop" then press tap
//   public int Id { get; set; }
//   public string? UserName { get; set; }
//   public  byte[] PasswordHash { get; set; }
//   public  byte[] PasswordSalt { get; set; }
  public DateOnly BirthDate { get; set; }
  public string? Aka { get; set; }
  public string? Gender { get; set; }
  public string? Introduction { get; set; }
  public string? LookingFor { get; set; }
  public string? Interests { get; set; }
  public string? City { get; set; }
  public string? Country { get; set; }
  public List<Photo> Photos { get; set; } = new();
  public DateTime Created { get; set; } = DateTime.UtcNow;
  public DateTime LastActive { get; set; } = DateTime.UtcNow;
   public List<UserLike>? LikedByUsers { get; set; }
  public List<UserLike>? LikedUsers { get; set; }
   public List<Message>? MessagesSent { get; set; }
    public List<Message>? MessagesReceived { get; set; }
  public int Age {
        get {
            return BirthDate.CalculateAge(); //using API.Extensions
        }
    }


}