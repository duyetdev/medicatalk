define(['react-redux', 'redux', 'Actions', '../components/Topics/Index'], function(ReactRedux, Redux, Actions, Topics) {
  const { connect } = ReactRedux
  const { bindActionCreators } = Redux

  const mapStateToProps = (state, ownProps) => {
    return state
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      actions : bindActionCreators(Actions, dispatch),
    }
  }

  const Container = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Topics)

  return Container
})
