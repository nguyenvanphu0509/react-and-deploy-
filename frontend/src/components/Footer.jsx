import React from 'react'

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
    return <>
        {completedTasksCount + activeTasksCount > 0 && (
            <div className='text-center'>
                <p className='text-center text-muted-foreground'>
                    {
                        completedTasksCount > 0 && (
                            <>
                                🎉 tuyet voi! ban da hoan thanh {completedTasksCount} viec
                                {
                                    activeTasksCount > 0 && `, con ${activeTasksCount} viec nua thoi. Co len!`
                                }
                            </>
                        )
                    }
                    {
                        completedTasksCount === 0 && activeTasksCount > 0 && (
                            <> hay bat dau lam {activeTasksCount} nhiem vu nao ! </>
                        )
                    }
                </p>
            </div>
        )}
    </>
}

export default Footer;