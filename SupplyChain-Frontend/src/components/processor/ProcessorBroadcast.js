import React from 'react'
import SubNav from '../../utils/SubNav'
import ProcessorSidebar from './ProcessorSidebar'

function ProcessorBroadcast() {
    return (
        <div className='home-body'>
            <div className='left-body'>
                <ProcessorSidebar pbroad='1'></ProcessorSidebar>
            </div>
            <div className='right-body'>
                <SubNav heading='Broadcast'></SubNav>
                <div className='broadcast-body'>
                    <h3>Add a new Broadcast!</h3>
                    <div className='broadcast-form'>
                        <div class="card">
                            <div class="card-header p-3 pt-2">
                                <div
                                    class="icon icon-lg icon-shape bg-gradient-danger shadow-success text-center border-radius-xl mt-n4 position-absolute">
                                    <i class="material-icons opacity-10">question_answer</i>
                                </div>
                                <div class="text-end pt-1">
                                    <h4 class="mb-0 text-info">Details</h4>
                                </div>
                            </div>
                            <div className='crop-body'>
                                <form role="form" action="" method="POST" name="form">
                                <select id="available_crop" name="crops" class="form-select form-select-lg mb-3" >
                                        <option selected>Select available crops</option>
                                        <option value="Sandy">Maize</option>
                                        <option value="Loamy">Chana</option>
                                        <option value="Black">Jowar</option>
                                        <option value="Red">Wheat</option>
                                        <option value="Clayey">Paddy</option>
                                    </select>
                                    <div class="input-group input-group-outline mb-3">
                                        <input type="text" id="P" name="P" class="form-control" placeholder='Enter crop name' />
                                    </div>
                                    <div class="input-group input-group-outline mb-3">
                                        <input type="text" id="K" name="K" class="form-control" placeholder='Quantity' />
                                    </div>
                                    <div class="input-group input-group-outline mb-3">
                                        <input type="text" id="temperature" name="temperature" class="form-control" placeholder='Expected Price (in ₹)' />
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" name="broadcastCrop"
                                            class="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProcessorBroadcast