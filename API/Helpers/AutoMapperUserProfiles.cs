using System;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Company.ClassLibrary1;

namespace API.Helpers;

public class AutoMapperUserProfiles : Profile
{
     public AutoMapperUserProfiles()
    {
         CreateMap<AppUser, MemberDto>()
            .ForMember(
                user => user.MainPhotoUrl,
                opt => opt.MapFrom(
                    user => user.Photos.FirstOrDefault(photo => photo.IsMain).Url
                    )
                );
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, AppUser>();

    }
}
