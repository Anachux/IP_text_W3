using API.Entities;
using Company.ClassLibrary1;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync();
    Task<AppUser?> GetUserByIdAsync(int id);
    Task<AppUser?> GetUserByUserNameAsync(string username);
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<IEnumerable<MemberDto>> GetMembersAsync();
    Task<MemberDto?> GetMember_By_user_name_Async(string username);
    Task<ActionResult<MemberDto?>> GetMemberAsync(string username);
    Task<ActionResult<MemberDto?>> GetMemberByUserNameAsync(string username);
}