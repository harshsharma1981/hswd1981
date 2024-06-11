import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Store/auth'
import axios from 'axios'

function SideList({selectedDiary,diaries}) {
const {curl,token }=useAuth()


  return (
    <div className="sidebar" id='sidebar'>
    <div className="list-group">
    {diaries.map((diary)=>(
    
    <div key={diary._id} onClick={()=>selectedDiary(diary)} className="list-group-item list-group-item-action">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1 title-list-name">{diary.title}</h5>
      <small className="text-muted">{diary.date}</small>
    </div>
    <p className="mb-1"></p>
  </div>
    ))}
</div>
    </div>
  )
}

export default SideList